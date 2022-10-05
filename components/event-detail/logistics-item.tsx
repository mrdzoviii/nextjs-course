import classes from "./logistics-item.module.css";

export interface ILogisticsItem {
  icon: React.FC;
  children: React.ReactElement;
}

export default function LogisticsItem({
  children,
  icon: Icon,
}: ILogisticsItem) {
  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
}
