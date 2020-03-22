import React from 'react';

function SamplePage({ goToParent, addPage }) {
  return (
    <div>
      {!goToParent
        ? ''
        : (
          <button
            type="button"
            className="btn btn-primary m-2"
            onClick={goToParent}
          >
            I have a father! Click me and i&apos;l show you who is he
          </button>
        )}
      <button
        type="button"
        className="btn btn-primary m-2"
        onClick={addPage}
      >
        Click me to add a new tab as child of this one...
      </button>
    </div>
  );
}

export default SamplePage;
