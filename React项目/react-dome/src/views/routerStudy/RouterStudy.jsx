import React from 'react';
import { useHistory } from 'react-router-dom';
import querystring from 'querystring';
function DS() {
  let history = useHistory();
  function handC() {
    console.log(history);
    history.push('/');
  }
  return <button onClick={handC}>1111</button>;
}
export default function a(props) {
  console.log(props);

  const params = new URLSearchParams(props.location.search);
  // console.log(params);
  // const value = querystring.parse(props.location.search);
  // console.log(value);
  return (
    <div>
      {params.get('name')}
      <DS />
    </div>
  );
}
