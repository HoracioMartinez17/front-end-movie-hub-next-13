import css from './loader.module.css'

 const Loader = () => {
  return (
    <div className={css.spinner}>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
  )
}
export default Loader