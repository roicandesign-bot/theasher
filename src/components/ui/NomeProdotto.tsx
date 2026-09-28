/**
 * Nome del prodotto per titoli e card: le sigle con il trattino (THC-X, THC-A, CBD+CBN)
 * non vanno mai a capo a metà.
 */
export function NomeProdotto({ nome }: { nome: string }) {
  return nome.split(/(\S*[-+]\S*)/).map((parte, i) =>
    /[-+]/.test(parte) ? (
      <span key={i} className="whitespace-nowrap">
        {parte}
      </span>
    ) : (
      parte
    ),
  )
}
