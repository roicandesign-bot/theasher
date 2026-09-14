import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** `content` = larghezza sito (1280px), `prose` = larghezza testo (672px) */
  width?: 'content' | 'prose'
  children: ReactNode
}

/** Centra il contenuto e applica i margini laterali (gutter) responsive. */
export function Container({ width = 'content', className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={cn(width === 'content' ? 'container-content' : 'container-prose', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
