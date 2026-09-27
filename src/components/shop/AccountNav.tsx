import { LogOut, MapPin, Package, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'

const voci = [
  { to: '/account', label: 'Riepilogo', icon: User, end: true },
  { to: '/account/ordini', label: 'I miei ordini', icon: Package, end: false },
  { to: '/account/indirizzi', label: 'Indirizzi', icon: MapPin, end: false },
]

/** Menu dell'area cliente: sopra su mobile, di lato su desktop. */
export function AccountNav() {
  return (
    <nav aria-label="Area cliente" className="flex flex-col gap-1">
      {voci.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-button px-4 py-3 text-sm transition duration-200 ease-out-soft',
              isActive
                ? 'bg-primary font-semibold text-primary-fg'
                : 'text-fg-muted hocus:bg-surface-hover hocus:text-fg',
            )
          }
        >
          <Icon className="size-4" />
          {label}
        </NavLink>
      ))}
      <NavLink
        to="/accedi"
        className="mt-2 flex items-center gap-3 rounded-button px-4 py-3 text-sm text-fg-muted transition hocus:text-danger"
      >
        <LogOut className="size-4" />
        Esci
      </NavLink>
    </nav>
  )
}
