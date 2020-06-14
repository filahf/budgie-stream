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
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 1rem auto 0;
  width: 300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 0.5rem;
  border: solid ${(props) => (props.selected ? 'palevioletred' : 'white')};
  border-width: 5px;
`;

const CardHeader = styled.header`
  user-select: none;
  padding-top: 0rem;
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

export default SonosCard;
