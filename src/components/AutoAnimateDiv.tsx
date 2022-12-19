import { PropsWithChildren, useEffect, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';

function AutoAnimateDiv(props: PropsWithChildren<{ className: string }>) {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return <div ref={parent} className={props.className}>
    {props.children}
  </div>;
}

export default AutoAnimateDiv;
