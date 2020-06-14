import styled from 'styled-components';
import React from 'react';

const SonosCard = (props) => {
  const { ip, name, selected } = props.devices;
  return (
    <CardWrapper selected={selected} onClick={() => props.onClick(ip)}>
      <CardHeader>
        <CardHeading>{name}</CardHeading>
      </CardHeader>
      <CardBody>{selected}</CardBody>
      <CardIp>{ip}</CardIp>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  overflow: hidden;
  margin: 1rem auto 0;
  width: 10rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 0.5rem;
  border: solid ${(props) => (props.selected ? 'palevioletred' : 'grey')};
  border-width: 0.2rem;
  text-align: center;
`;

const CardHeader = styled.header`
  user-select: none;
  padding-bottom: 1rem;
`;

const CardHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const CardBody = styled.div`
  padding-right: 1.5rem;
  padding-left: 1.5rem;
`;

export const CardIp = styled.p`
  display: inline-block;
  font-size: 0.7rem;
  color: #aaa;
  margin-bottom: 0rem;
`;

export default SonosCard;
