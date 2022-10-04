import React, { useState } from "react";
import { Modal } from "../modal";

interface HowToPlayProps {}

export const HowToPlay: React.FC<HowToPlayProps> = () => {
  const [hidden, setHidden] = useState(true);
  const onClick = () => setHidden(false);
  return (
    <>
      {!hidden && (
        <Modal onClose={() => setHidden(true)} title="How To Play">
          <div className="htp-wrap">
            <h4>Word Crusher</h4>
            <ul>
              <li>
                Keep it by your side when solving word puzzles like Wordle,
                Hangman, and more.
              </li>
              <li>
                You can search for words by setting allowed and disallowed
                characters in a specific place or all places.
              </li>
            </ul>
            <hr />
            <h4>Count</h4>
            <ul>
              <li>Specify the number of lengths of words.</li>
            </ul>
            <hr />
            <h4>Allow Strike</h4>
            <ul>
              <li>
                If you know a letter at a specific location in the word you're
                looking for, set it to that location.
              </li>
            </ul>
            <hr />
            <h4>Allow Ball</h4>
            <ul>
              <li>
                If you know a letter that can contain anywhere in the word you
                are looking for, add the letter.
              </li>
            </ul>
            <hr />
            <h4>Deny Strike</h4>
            <ul>
              <li>
                If you know that a certain position in the word you are looking
                for doesn't contain any letters, set the letters in that
                position.
              </li>
            </ul>
            <hr />
            <h4>Deny Ball</h4>
            <ul>
              <li>
                If you know a letter that doesn't appear anywhere in the word
                you're looking for, add it.
              </li>
            </ul>
            <hr />
            <h4>Clear</h4>
            <ul>
              <li>Reset the settings except for the count.</li>
            </ul>
            <hr />
            <h4>Submit</h4>
            <ul>
              <li>Search for words based on settings.</li>
            </ul>
          </div>
        </Modal>
      )}
      <div className="htp-btn-wrap">
        <button onClick={onClick}>❓</button>
      </div>
    </>
  );
};
