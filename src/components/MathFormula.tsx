import React, { useMemo } from 'react';
import katex from 'katex';

interface MathFormulaProps {
  math: string;
  display?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  math,
  display = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
      });
    } catch {
      return null;
    }
  }, [math, display]);

  if (!html) {
    return <code className={`font-mono text-sm ${className}`}>{math}</code>;
  }

  return (
    <span
      className={`inline-block align-middle ${display ? 'my-2 block overflow-x-auto text-center' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
