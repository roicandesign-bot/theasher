import { createFileRoute } from '@tanstack/react-router'
import { HasherApp } from '@/HasherApp'

export const Route = createFileRoute('/')({ component: HasherApp, ssr: false })
