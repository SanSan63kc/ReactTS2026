import React, { ErrorInfo, ReactNode, Suspense } from "react"
import { withTranslation } from "react-i18next"
import { Loader } from "shared/ui/Loader/Loader"
import { PageError } from "widgets/PageError"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    //console.log(error, errorInfo)
  }

  render() {
    let { hasError } = this.state
    let { children } = this.props
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <Suspense fallback={<Loader />}>
          <PageError />
        </Suspense>
      )
    }

    return children
  }
}

export default ErrorBoundary
