import React from 'react';
import useGame from '../stores/useGame';

function Interface() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      
      {/* Time */}
      <Timer />

      {/* Restart */}
      <Restart />
    </div>
  )
}

function Timer() {
  const [ time, setTime ] = React.useState( 0 );
  const phase = useGame( (state) => state.phase );

  React.useEffect( () => {
    const interval = setInterval( () => {
      if ( phase === 'playing' ) {
        setTime( time => time + 0.01 );
      }
    }, 10 );

    if ( phase === 'ready' ) {
      setTime( 0 );
      clearInterval( interval );
    }

    return () => clearInterval( interval );
  }, [ phase ] );

  return (
    <div className="absolute top-sm right-0 mt-10 pb-3 w-full text-center text-8xl bg-[#00000033]">
      { time.toFixed( 2 ) }
    </div>
  )
}

function Restart() {
  const phase = useGame( (state) => state.phase );
  const restart = useGame( (state) => state.restart );

  return (
    <>
      { phase === 'end' && ( 
        <button
          className="grid place-items-center top-2/4 left-2/4 -translate-x-2/4 px-4 py-2 uppercase absolute bg-red-400 text-white pointer-events-auto text-2xl"
          onClick={ restart }
        > 
          restart 
        </button>
      ) }
    </>
  )
}

export default Interface;