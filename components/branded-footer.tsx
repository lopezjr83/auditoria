import Link from 'next/link'

interface BrandedFooterProps {
  productName?: string
  year?: number
}

export function BrandedFooter({
  productName = 'AuditorIA',
  year = new Date().getFullYear(),
}: BrandedFooterProps) {
  return (
    <footer className="border-t border-border/50 bg-muted/30 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span>
            © {year}{' '}
            <span className="font-medium text-foreground">
              {productName}
            </span>
          </span>
          <Link
            href="/privacidad"
            className="hover:text-foreground transition-colors"
          >
            Privacidad
          </Link>
          <Link
            href="/terminos"
            className="hover:text-foreground transition-colors"
          >
            Términos
          </Link>
          <Link
            href="mailto:security@visionproces.com"
            className="hover:text-foreground transition-colors"
          >
            Seguridad
          </Link>
        </div>
        <div className="text-center sm:text-right">
          <span>
            by{' '}
            <Link
              href="https://visionproces.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground font-medium transition-colors"
            >
              VisionProces
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}
