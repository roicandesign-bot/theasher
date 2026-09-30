import { createFileRoute } from '@tanstack/react-router'
import { HasherApp } from '@/HasherApp'

// Qualunque indirizzo diverso da "/": il sito The Hasher decide lui la pagina (o il suo 404).
export const Route = createFileRoute('/$')({ component: HasherApp, ssr: false })
