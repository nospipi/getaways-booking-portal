//---------------------------------------------------------

const Loading = () => {
  return (
    <main className="page-container">
      <div className="content-wrapper">
        <div className="content-container">
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-text">Loading your tour details...</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
