import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppState } from "../../context/context";
import { Modal } from "../modal";
interface ResultProps {}

export const Result: React.FC<ResultProps> = () => {
  const state = useAppState();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | Error>(false);
  const [result, setResult] = useState<string[]>([]);
  const [hidden, setHidden] = useState(true);
  
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

  const onClick = () => {
    dispatch({ type: "SUBMIT" });
    setHidden(false);
  };

  return (
    <div className="result-wrap">
      <button onClick={onClick}>submit</button>
      {!hidden && (
        <Modal onClose={() => setHidden(true)}>
          {result.length > 0 ? (
            <ul className="result-list">
              {result.map((e: string) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          ) : (
            <div>No Result!</div>
          )}
        </Modal>
      )}
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
