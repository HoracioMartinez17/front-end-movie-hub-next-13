import css from './loadingSkeleton.module.css'

export default function LoadingSkeleton() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className={css.cards}>
  <div className={`${css.card} ${css.is_loading}`}>
    <div className={css.image}></div>
  </div>
</div>
    )
  }