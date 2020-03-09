import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { push } from 'connected-react-router';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {
  useModalComponent, useModalTitle, useModalToggle,
  usePopoutDialog, useModalDisableCloseBUtton
} from 'services/modal/selectors';
import { closeModal, deletePopoutDialog } from 'services/modal';
import theme from 'constants/theme';
import * as routes from 'constants/routes';
import Icons from 'components/Icons';

import Login from 'containers/Login';
import Main from 'containers/MainPage';

import { useIsLoggedIn } from 'services/login/selectors';

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: #FFFBF6;
`;

const ModalBackground = styled.div<{ hasModal : boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: ${p => p.hasModal ? 1 : 0};
  background-color: rgba(0, 0, 0, 0.4);
  pointer-events: ${p => p.hasModal ? 'normal' : 'none'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s opacity ease-in;
  z-index: 1000;
`;
const ModalWrapper = styled.div<{ hasModal : boolean }>`
  background-color: ${theme.WHITE};
  border-radius: 6px;
  margin-top: ${p => p.hasModal ? 0 : 50}px;
  transition: 0.3s margin-top ease-out;
`;
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: ${theme.PRIMARY};
  color: ${theme.WHITE};
  font-size: large;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
`;
const CloseIconArea = styled.div`
  cursor: pointer;
`;
const ModalHandler = () => {
  const dispatch = useDispatch();
  const modal = useModalComponent();
  const modalTitle = useModalTitle();
  const showModal = useModalToggle();
  const disableCloseButton = useModalDisableCloseBUtton();
  return (
    <ModalBackground
      hasModal={showModal}
    >
      <ModalWrapper  hasModal={showModal}>
        <ModalHeader>
          {modalTitle}
          <Padding />
          {!disableCloseButton && (
            <CloseIconArea>
              <Icons.X
                color={theme.WHITE}
                onClick={() => dispatch(closeModal())}
              />
            </CloseIconArea>
          )}
        </ModalHeader>
        {modal}
      </ModalWrapper>
    </ModalBackground>
  );
}

const PopoutWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  padding: 20px;
`;
const DialogWrapper = styled.div<{ show? : boolean }>`
  background-color: ${theme.WHITE};
  padding: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  opacity: ${p => p.show ? 1 : 0};
  top: ${p => p.show ? '0px' : '20px'};;
  margin-bottom: 20px;
  transition: all .5s ease-in;
`;
const DialogContext = styled.div`
  margin: 0px 10px;
`;
const Padding = styled.div`
  flex: 1;
`;
const Dialog = ({ id, message, fixedId } : { id : string, message : string, fixedId : string }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 0);
    if (!fixedId) {
      setTimeout(() => dispatch(deletePopoutDialog(id)), 15000);
    }
  });

  return (
    <DialogWrapper show={show}>
      <DialogContext>{message}</DialogContext>
      <Padding />
      <Icons.X
        size={15}
        color={theme.GRAY}
        onClick={() => dispatch(
          deletePopoutDialog(id)
        )}
      />
    </DialogWrapper>
  );
}
const PopoutHandler = () => {
  const popoutDialogs = usePopoutDialog();
  return (
    <PopoutWrapper>
      {popoutDialogs.keySeq().map((key : string) => (
        <Dialog
          key={key}
          id={key}
          message={popoutDialogs.getIn([key, 'message'])}
          fixedId={popoutDialogs.getIn([key, 'fixedId'])}
        />
      ))}
    </PopoutWrapper>
  );
}

const PROTECTED_PAGES : Array<{ path : string, component: React.FC }> = [
  // { path: `${routes.PROJECTS}/:insureType`, component: Projects },
  // { path: `${routes.PROGRAMS}/:insureType/:projectCode`, component: Programs },

  // { path: `${routes.CAR_INSURANCE_DETAIL}/:projectCode/:todoId`, component: CarInsuranceDetail },
  // { path: `${routes.CAR_INSURANCE_APPLY_FORM}/:projectCode/:todoId`, component: CarInsuranceApplyForm },
  // { path: `${routes.CAR_INSURANCE_CONFIRM}/:projectCode/:todoId`, component: CarInsuranceConfirm },
  // { path: `${routes.CAR_INSURANCE_SEND_REVIEW}/:todoId`, component: CarInsuranceSendReview },

  // { path: `${routes.FIRE_INSURANCE_DETAIL}/:todoId`, component: FireInsuranceDetail },
  // { path: `${routes.FIRE_INSURANCE_CALCULATION}/:todoId`, component: FireInsuranceCalculation },

  // { path: `${routes.TRAVEL_INSURANCE_DETAIL}/:todoId`, component: TravelInsuranceDetail },
  // { path: `${routes.TRAVEL_INSURANCE_CALCULATION}/:todoId`, component: TravelInsuranceCalculation },

  // { path: `${routes.HEALTH_INSURANCE_DETAIL}/:todoId`, component: HealthInsuranceDetail },
  // { path: `${routes.HEALTH_INSURANCE_CALCULATION}/:todoId`, component: HealthInsuranceCalculation },

  // { path: `${routes.INSURANCE_APPLY}/:todoId`, component: InsuranceApply },
  // { path: `${routes.INSURANCE_CONFIRM}/:todoId`, component: InsuranceConfirm },

  // { path: routes.TODO_CASES, component: TodoCases },
  // { path: routes.COMBO_PRODUCTS, component: ComboProducts },
  // { path: routes.ADD_COMBO_PRODUCTS, component: SelectProject },
  // { path: `${routes.EDIT_PROGRAM}/:projectCode/:programId`, component: EditProgram },
];

const Protected = ({ children } : any) => {
  const isLoggedIn = useIsLoggedIn();
  if (!isLoggedIn) {
    return null;
  }
  return children;
}

const App: React.FC = () => {

  const dispatch = useDispatch();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(push(routes.LOGIN));
    }
  }, [dispatch, isLoggedIn]);

  return (
    <MainWrapper>
      <ModalHandler />
      <PopoutHandler />
      <Switch>
        <Route path={routes.MAIN}><Main /></Route>
        {PROTECTED_PAGES.map(({ path, component : Comp }, key) => (
          <Route key={key} path={path}>
            <Protected>
              <Comp />
            </Protected>
          </Route>
        ))}
        <Route path={routes.LOGIN}><Login /></Route>
        <Route path=""><Redirect to={routes.LOGIN} /></Route>
      </Switch>
    </MainWrapper>
  );
}

export default App;
