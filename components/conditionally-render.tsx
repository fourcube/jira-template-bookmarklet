import React, { useEffect, useState } from "react";

export type ConditionallyRenderProps = {
  client?: boolean;
  server?: boolean;
} & React.PropsWithChildren;

const ConditionallyRender: React.FC<ConditionallyRenderProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted && props.client) {
    return null;
  }

  if (isMounted && props.server) {
    return null;
  }

  return props.children as React.ReactElement;
};

export default ConditionallyRender;
