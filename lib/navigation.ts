export interface NavMenuItem {
  label: string;
  href: string;
  children?: NavMenuItem[];
}

export interface NavConfig {
  menu: NavMenuItem[];
  cta: {
    label: string;
    href: string;
  };
}

export const navigationConfig: NavConfig = {
  menu: [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Destinations",
      href: "/destinations",
      children: [
        {
          label: "Mauritius",
          href: "/destinations/mauritius",
          children: [
            { "label": "North Coast", "href": "/destinations/mauritius/north" },
            { "label": "East Coast", "href": "/destinations/mauritius/east" },
            { "label": "South Coast", "href": "/destinations/mauritius/south" },
            { "label": "West Coast", "href": "/destinations/mauritius/west" }
          ]
        },
        {
          label: "Rodrigues",
          href: "/destinations/rodrigues"
        },
        {
          label: "International",
          href: "/destinations/international"
        }
      ]
    },
    {
      label: "Hotels",
      href: "/hotels",
      children: [
        { "label": "All Hotels", "href": "/hotels" },
        { "label": "Luxury Resorts", "href": "/hotels/luxury-resorts" },
        { "label": "Beach Resorts", "href": "/hotels/beach-resorts" },
        { "label": "Adults Only", "href": "/hotels/adults-only" },
        { "label": "Family Resorts", "href": "/hotels/family-resorts" },
        { "label": "Boutique Hotels", "href": "/hotels/boutique-hotels" }
      ]
    },
    {
      label: "Holiday Packages",
      href: "/packages",
      children: [
        { "label": "All Packages", "href": "/packages" },
        { "label": "Weekend Deals", "href": "/packages/weekend" },
        { "label": "Full Board Packages", "href": "/packages/full-board" },
        { "label": "All Inclusive Packages", "href": "/packages/all-inclusive" },
        { "label": "Honeymoon Packages", "href": "/packages/honeymoon" },
        { "label": "Family Holiday Packages", "href": "/packages/family" },
        { "label": "Seasonal Promotions", "href": "/packages/promotions" }
      ]
    },
    {
      label: "Experiences",
      href: "/experiences",
      children: [
        { "label": "All Experiences", "href": "/experiences" },
        { "label": "Catamaran Cruises", "href": "/experiences/catamaran" },
        { "label": "Island Tours", "href": "/experiences/island-tours" },
        { "label": "Adventure Activities", "href": "/experiences/adventure" },
        { "label": "Water Sports", "href": "/experiences/water-sports" },
        { "label": "Day Packages", "href": "/experiences/day-packages" },
        { "label": "Private Tours", "href": "/experiences/private-tours" }
      ]
    },
    {
      label: "Cruises",
      href: "/cruises",
      children: [
        { "label": "All Cruises", "href": "/cruises" },
        { "label": "Cruise Packages", "href": "/cruises/packages" },
        { "label": "Cruise Destinations", "href": "/cruises/destinations" },
        { "label": "Cruise Deals", "href": "/cruises/deals" }
      ]
    },
    {
      label: "Travel Guide",
      href: "/travel-guide",
      children: [
        { "label": "Mauritius Travel Guide", "href": "/travel-guide/mauritius" },
        { "label": "Rodrigues Guide", "href": "/travel-guide/rodrigues" },
        { "label": "Best Time to Visit", "href": "/travel-guide/best-time" },
        { "label": "Top Things to Do", "href": "/travel-guide/things-to-do" }
      ]
    },
    {
      label: "About",
      href: "/about",
      children: [
        { "label": "Our Story", "href": "/about" },
        { "label": "Our Team", "href": "/about/team" },
        { "label": "News & Updates", "href": "/news" }
      ]
    },
    {
      label: "Contact",
      href: "/contact",
      children: [
        { "label": "Contact Us", "href": "/contact" },
        { "label": "Request a Quote", "href": "/contact/request-quote" },
        { "label": "Office Locations", "href": "/contact/offices" }
      ]
    }
  ],
  cta: {
    "label": "Plan My Trip",
    "href": "/plan-my-trip"
  }
};
