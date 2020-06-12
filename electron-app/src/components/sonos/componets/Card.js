import styled from 'styled-components';

export const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 1rem auto 0;
  width: 300px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 0.5rem;
  border: solid ${(props) => (props.primary ? 'palevioletred' : 'white')};
  border-width: 5px;
`;

export const CardHeader = styled.header`
  padding-top: 0rem;
  padding-bottom: 1rem;
`;

export const CardHeading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

export const CardBody = styled.div`
  padding-right: 1.5rem;
  padding-left: 1.5rem;
`;
