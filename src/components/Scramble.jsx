import { useScramble } from '../lib/cyber'

/* Texto que se "descifra" al activarse. Es solo visual (aria-hidden):
   quien lo use debe poner el texto real para lectores de pantalla. */
export default function Scramble({ text, active, delay, duration }) {
  const out = useScramble(text, active, { delay, duration })
  return <span aria-hidden="true">{out}</span>
}
