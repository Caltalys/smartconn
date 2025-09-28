import Link from 'next/link';
import { Fragment } from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <Fragment key={index}>
            <li key={item.label}>
              {item.href ? (
                <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground">{item.label}</span>
              )}
            </li>
            {index < items.length - 1 && <li key={`separator-${index}`} aria-hidden="true" className="text-muted-foreground">/</li>}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}