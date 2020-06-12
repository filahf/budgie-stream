import React from 'react';
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardIcon,
  CardFieldset,
  CardInput,
  CardOptionsItem,
  CardOptions,
  CardOptionsNote,
  CardButton,
  CardLink,
} from './componets/Card';

const SonosList = () => {
  return (
    <>
      <CardWrapper>
        <CardHeader>
          <CardHeading>Device</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>or sign up with</CardFieldset>

          <CardFieldset>
            <CardButton type='button'>Check</CardButton>
          </CardFieldset>

          <CardFieldset>
            <CardLink>I already have an account</CardLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </>
  );
};

export default SonosList;
