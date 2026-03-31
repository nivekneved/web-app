import nodemailer from 'nodemailer'
import { createClient } from './supabaseServer'

/**
 * Shared Email Service for Travellounge Ecosystem
 * Handles SMTP transporter initialization and template rendering
 */

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER_URL,
    port: parseInt(process.env.MAIL_SERVER_PORT || '587'),
    secure: process.env.MAIL_SERVER_PORT === '465', 
    auth: {
        user: process.env.MAIL_SERVER_LOGIN,
        pass: process.env.MAIL_SERVER_PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
})

export type EmailPayload = {
    to: string
    templateName: string
    variables: Record<string, string | number>
}

/**
 * Fetches template from Supabase and fills placeholders with variables
 */
export async function sendTemplatedEmail({ to, templateName, variables }: EmailPayload) {
    try {
        const supabase = await createClient()
        
        // 1. Fetch Template
        const { data: template, error } = await supabase
            .from('email_templates')
            .select('*')
            .eq('name', templateName) 
            .single()

        if (error || !template) {
            throw new Error(`Template not found: ${templateName}`)
        }

        // 2. Process Subject & Body
        let subject = template.subject
        let body = template.body

        Object.entries(variables).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g')
            subject = subject.replace(regex, String(value))
            if (body) body = body.replace(regex, String(value))
        })

        // 3. Send Email
        const info = await transporter.sendMail({
            from: `"Travellounge" <${process.env.MAIL_FROM_EMAIL || 'noreply@travellounge.mu'}>`,
            to,
            subject,
            text: body, // Fallback to plain text if not HTML
            html: body,  // Most existing 'body' values are probably text-heavy or basic HTML
        })

        console.log(`[Email] Template '${templateName}' sent to ${to}. MessageId: ${info.messageId}`)
        return { success: true, messageId: info.messageId }
        
    } catch (err) {
        console.error('[Email] Execution Error:', err)
        return { success: false, error: (err as Error).message }
    }
}

/**
 * Basic raw email sender for ad-hoc notifications
 */
export async function sendRawEmail({ to, subject, html, text }: { to: string, subject: string, html: string, text?: string }) {
    try {
        const info = await transporter.sendMail({
            from: `"Travellounge" <${process.env.MAIL_FROM_EMAIL || 'noreply@travellounge.mu'}>`,
            to,
            subject,
            text,
            html,
        })
        return { success: true, messageId: info.messageId }
    } catch (err) {
        console.error('[Email] Raw Send Error:', err)
        return { success: false, error: (err as Error).message }
    }
}
