import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    useBreakpointValue,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Flex,
    Wrap,
    WrapItem,
  } from '@chakra-ui/react'
import React from 'react'
import { TbWorld } from 'react-icons/tb'
import Currency from './Currency'
import Language from './Language'


  
export default function NavModel() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = React.useRef(null)


    const iconSize = useBreakpointValue({ base: "24px", md: "28px", lg: "32px" });

  
    return (
      <>
        <TbWorld size={iconSize} onClick={onOpen}  cursor="pointer" />
  
        
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              

            <Tabs>
  <TabList>
    <Tab>Language</Tab>

    <Tab>Currency</Tab>
   
  </TabList>

  <TabPanels>
    <TabPanel>
   <Language/>
    </TabPanel>
    <TabPanel>
      <Currency/>
    </TabPanel>
   
  </TabPanels>
</Tabs>

            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }