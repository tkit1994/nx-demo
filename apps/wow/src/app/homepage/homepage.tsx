import { Button, Col, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import './homepage.module.css';

/* eslint-disable-next-line */
export interface HomepageProps {}

export function Homepage(props: HomepageProps) {
  const [filePath, setfilePath] = useState('');
  const [status, setstatus] = useState('null');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async function getWowPath() {
      const wowPath = await window.electron.getWowPath();
      setfilePath(wowPath);
      getStatus(filePath);
    }
    async function getStatus(wowPath: string) {
      const status = await window.electron.getCurrentStatus(wowPath);
      setstatus(status);
    }
    getWowPath();
  }, [filePath]);
  const getStatus = async (wowPath: string) => {
    const status = await window.electron.getCurrentStatus(wowPath);
    setstatus(status);
  };
  const handleChoose = () => {
    async function getFile() {
      const file = await window.electron.getFile();
      if (!file.canceled) {
        setfilePath(file.filePaths[0]);
        window.electron.setWowPath(file.filePaths[0]);
        // getStatus(filePath); // not needed since status will be got in useEffect
      }
    }
    getFile();
  };
  const handleNormalGame = () => {
    window.electron.send('normalGame', filePath);
    getStatus(filePath);
  };
  const handleBattleGround = () => {
    window.electron.send('battleGround', filePath);
    getStatus(filePath);
  };
  const handleBattlePet = () => {
    window.electron.send('battlePet', filePath);
    getStatus(filePath);
  };
  const handleInit = () => {
    window.electron.send('init', filePath);
    getStatus(filePath);
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
            <Button onClick={handleInit} danger>
              初始化
            </Button>
          </Col>
        </Row>
      </div>
      <div className="status">Current Status is : {status}</div>
    </div>
  );
}

export default Homepage;
