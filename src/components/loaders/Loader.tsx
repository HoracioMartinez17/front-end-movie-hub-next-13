import css from './loader.module.css'

export const Loader = () => {
  return (
    <div className={css.spinner}>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
  )
}
