'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavMenuItem } from '@/lib/navigation';
import { cn } from '@/lib/utils'; // Assuming cn utility exists, will create if not

interface NavRecursiveProps {
  items: NavMenuItem[];
  level?: number;
  onClose?: () => void;
  isScrolled?: boolean;
}

export const NavRecursive: React.FC<NavRecursiveProps> = ({ items, level = 0, onClose, isScrolled }) => {
  return (
    <ul className={cn(
      "flex",
      level === 0 ? "flex-row items-center gap-8" : "flex-col py-3 w-64 px-2"
    )}>
      {items.map((item, index) => (
        <NavItem key={`${item.href}-${index}`} item={item} level={level} onClose={onClose} isScrolled={isScrolled} />
      ))}
    </ul>
  );
};

const NavItem: React.FC<{ item: NavMenuItem; level: number; onClose?: () => void; isScrolled?: boolean }> = ({ item, level, onClose, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hasChildren = item.children && item.children.length > 0;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      onClose?.();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <li
      className={cn(
        "relative group/item",
        level === 0 ? "h-full flex items-center" : "w-full"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <Link
        href={item.href}
        className={cn(
          "flex items-center justify-between transition-all duration-300",
          level === 0 
            ? cn(
                "hover:text-red-600 font-extrabold py-8 text-[11px] uppercase tracking-[0.2em]",
                isScrolled 
                  ? "text-slate-900 dark:text-slate-100" 
                  : "text-white/95"
              )
            : "px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-600 rounded-lg font-semibold"
        )}
        onClick={(e) => {
          if (item.href === '#') {
            e.preventDefault();
            setIsOpen(!isOpen);
          } else {
            setIsOpen(false);
            onClose?.();
          }
        }}
        aria-haspopup={hasChildren ? "true" : "false"}
        aria-expanded={isOpen}
      >
        <span>{item.label}</span>
        {hasChildren && (
          level === 0 ? (
            <ChevronDown size={14} className={cn("ml-1 transition-transform duration-200", isOpen && "rotate-180")} />
          ) : (
            <ChevronRight size={14} className="ml-2" />
          )
        )}
      </Link>

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute z-50 bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl border border-slate-100 dark:border-slate-800 p-2",
              level === 0 ? "top-full left-0 mt-2" : "top-0 left-full ml-2"
            )}
          >
            <NavRecursive items={item.children!} level={level + 1} onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
