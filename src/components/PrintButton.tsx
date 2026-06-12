import { HiPrinter } from 'react-icons/hi2'

export function PrintButton() {
  return (
    <button
      type="button"
      className="print-button"
      onClick={() => window.print()}
      aria-label="Print CV"
    >
      <HiPrinter className="print-button__icon" aria-hidden="true" />
    </button>
  )
}
