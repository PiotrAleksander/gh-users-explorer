import { Text } from "@primer/components";
import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  message = `This error was probably due to the rate limit for GH api exceeded.
          Please check the readme on how to authorize the app to raise hourly
          rate limit.`;

  render() {
    if (this.state.hasError) {
      console.warn(this.message);
      return <Text>{this.message}</Text>;
    }
    return this.props.children;
  }
}
