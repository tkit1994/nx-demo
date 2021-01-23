import { Button, Col, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import './homepage.module.css';

/* eslint-disable-next-line */
export interface HomepageProps {}

export function Homepage(props: HomepageProps) {
  const [filePath, setfilePath] = useState('');
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }, []);

  const handleChoose = () => {
    async function getFile() {
      const file = await window.electron.getFile();
      if (!file.canceled) {
        setfilePath(file.filePaths[0]);
      }
    }
    getFile();
  };
  const handleNormalGame = () => {
    window.electron.send('normalGame', filePath);
  };
  const handleBattleGround = () => {
    window.electron.send('battleGround', filePath);
  };
  const handleBattlePet = () => {
    window.electron.send('battlePet', filePath);
  };
  const handleInit = () => {
    window.electron.send('init', filePath);
  };
  return (
    <div>
      <div className="header">Wow profile switcher</div>
      <div className="filepath">
        <Row>
          <Col span="16">
            <Input type="text" disabled value={filePath} />
          </Col>
          <Col>
            <Button onClick={handleChoose} type="primary">
              Choose
            </Button>
          </Col>
        </Row>
      </div>
      <div className="buttongroup">
        <Row>
          <Col>
            <Button onClick={handleNormalGame}>正常游戏</Button>
          </Col>
          <Col>
            <Button onClick={handleBattlePet}>宠物对战</Button>
          </Col>
          <Col>
            <Button onClick={handleBattleGround}>评级战场</Button>
          </Col>
          <Col>
            <Button onClick={handleInit} danger>初始化</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Homepage;
