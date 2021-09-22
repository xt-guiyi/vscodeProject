import React from 'react';
import Dome1 from '../../components/dome_1/Dome_1';
import Dome2 from '../../components/dome_2/Dome_2';
import Dome3 from '../../components/dome_3/Dome_3';
import Dome4 from '../../components/dome_4/Dome_4';
import Dome5 from '../../components/dome_5/Dome_5';
import Dome6 from '../../components/dome_6/Dome_6';
import Dome7 from '../../components/dome_7/Dome_7';

export default function ComponentStudy(props) {
  console.log(props);
  return (
    <div>
      <Dome1 />
      <Dome2 />
      <Dome3 />
      <Dome4 />
      <Dome5 />
      <Dome6 />
      <Dome7 />
    </div>
  );
}
