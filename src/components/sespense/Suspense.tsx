import css from './suspense.module.css'

export const SuspenseLoader = () => {
  return (
    <div className={css.loader}>
  <div className={css.wrapper}>
    <div className={css.circle}></div>
    <div className={css.line1}></div>
    <div className={css.line2}></div>
    <div className={css.line3}></div>
    <div className={css.line4}></div>
  </div>
</div>
  )
}
