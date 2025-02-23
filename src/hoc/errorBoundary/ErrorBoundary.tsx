import { Component, ErrorInfo, ReactNode } from 'react';
import { ChildrenAsProps } from '../../common/types/types';
import classes from './ErrorBoundary.module.scss';
import Layout from '../layout/Layout';

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ChildrenAsProps,
  ErrorBoundaryState
> {
  children: ReactNode[] | ReactNode;
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('ErrorBoundary caught an error');
    console.log('error', error, 'info', info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Layout>
          <div className={classes.errorMessageContainer}>
            <div className={classes.errorMessage}>
              Something went wrong! Try again later
            </div>
          </div>
        </Layout>
      );
    }

    return this.props.children;
  }
}
