import React, { cloneElement } from 'react'

const Loading = ({ loading, error, children }) => {
  
  
  const elmentType = children?.type?.render?.displayName;
  const renderHandelr = () =>{
    
    if(elmentType === "Button"){

      const cloneButton = React.cloneElement(children, {disabled: true},"loading...")

      return(
        <>
        {loading ? (
          cloneButton
        ) : error ? (
          <>
          {children}
          <p>{error}</p>
          </>
        ) : (
          children
        )}
      </>
      )
    }

    return(
      <>
          {loading ? (
            <p>loading please wait...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            children
          )}
      </>
    )
  }

  return renderHandelr()
}

export default Loading