import React, { useEffect, useState } from "react";
import { useAppState } from "../../context/context";
interface ResultProps {}

export const Result: React.FC<ResultProps> = () => {
  const state = useAppState();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | Error>(false);
  const [result, setResult] = useState<string[]>([]);
  useEffect(() => {
    setError(false);
    setLoading(true);
    state.result
      .then((data: string[]) => setResult(data))
      .catch((err) => {
        setError(err);
      });
    setLoading(false);
  }, [state.result]);

  if (loading) return <ResultLoading />;
  if (error instanceof Error) return <ResultError error={error} />;
  return (
    <div className="result-wrap">
      <div>
        <ul>
          {result.map((e: string) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface ResulLoadingProps {}
const ResultLoading: React.FC<ResulLoadingProps> = () => {
  return (
    <div className="result-wrap">
      <div>Loading...</div>
    </div>
  );
};

interface ResulErrortProps {
  error: Error;
}
const ResultError: React.FC<ResulErrortProps> = ({ error }) => {
  return (
    <div className="result-wrap">
      <div>{error.message}</div>
    </div>
  );
};
