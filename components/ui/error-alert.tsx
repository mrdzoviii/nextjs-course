import classes from "./error-alert.module.css";

export interface IErrorAlert {
  children: React.ReactElement | React.ReactElement[];
}

function ErrorAlert({ children }: IErrorAlert) {
  return <div className={classes.alert}>{children}</div>;
}

export default ErrorAlert;
