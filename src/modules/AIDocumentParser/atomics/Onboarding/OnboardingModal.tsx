import { CloseOutlined } from '@ant-design/icons';
import { ConfigProvider, Modal, ModalProps } from 'antd';
import { CarouselRef } from 'antd/es/carousel';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Button from '@/components/Core/Button';
import { Body, Heading } from '@/components/Core/Typographies';
import { staticUrl } from '@/helpers/Path.helper';

import * as OnboardingModalStyled from './styled';

interface CarouselItem {
  image: string;
  title: string;
  description: React.ReactNode;
}

const dataSource: CarouselItem[] = [
  {
    image: staticUrl('/app-assets/images/ai-document-parser/onboarding.svg'),
    title: 'Introducing AI-Powered Invoice Parsing',
    description: (
      <Body variant="large" className="!m-0 !text-neutral-500">
        Easily extract structured data from your invoice documents. Fast,
        accurate, effortless. Try it out today!
      </Body>
    ),
  },
];

const OnboardingModal: React.FC<ModalProps> = props => {
  const $carousel = useRef<CarouselRef>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = useCallback(() => {
    $carousel.current?.prev();
    setCurrentSlide(v => v - 1);
  }, []);

  const handleNextSlide = useCallback(() => {
    $carousel.current?.next();
    setCurrentSlide(v => v + 1);
  }, []);

  // NOTE: Preload images
  useEffect(() => {
    dataSource.forEach(item => {
      const image = new Image();
      image.src = item.image;
    });
  }, []);

  return (
    <>
      <OnboardingModalStyled.GlobalStyle />

      <Modal
        {...props}
        wrapClassName="js-onboarding-modal"
        centered
        footer={null}
        maskClosable={false}
        closeIcon={<CloseOutlined className="!text-base" />}
        width={560}
      >
        <div className="">
          <div className="-my-5 -mx-6 h-[360px] bg-gradient-to-b from-orange-100 to-white flex items-end justify-center relative rounded-t-2xl overflow-hidden">
            <div
              className="absolute inset-0 z-20"
              style={{
                background:
                  'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 60%, rgb(255, 255, 255))',
              }}
            />

            <div className="relative z-10">
              <img
                src={dataSource[currentSlide]?.image}
                className="w-full"
                alt="Onboarding"
              />
            </div>
          </div>

          <div className="mt-10">
            <ConfigProvider
              theme={{
                components: {
                  Carousel: {
                    dotActiveWidth: 6,
                    dotHeight: 6,
                    dotWidth: 6,
                  },
                },
              }}
            >
              <OnboardingModalStyled.Carousel ref={$carousel} fade>
                {dataSource.map((item, i) => {
                  return (
                    <div key={i}>
                      <div className="text-center flex flex-col items-center h-40">
                        <Heading level={1} className="!mb-3">
                          {item.title}
                        </Heading>

                        <Body
                          variant="large"
                          className="!mb-8 !text-neutral-500"
                        >
                          {item.description}
                        </Body>

                        <div className="flex gap-6 mt-auto">
                          {dataSource.length > 1 && (
                            <Button
                              variant="secondary"
                              onClick={
                                i === 0 ? props.onCancel : handlePrevSlide
                              }
                              className="w-auto sm:w-40 !text-sm"
                            >
                              {i === 0 ? 'See All Templates' : 'Previous'}
                            </Button>
                          )}

                          <Button
                            variant="primary"
                            className="w-auto sm:w-40 !text-sm"
                            onClick={
                              i === dataSource.length - 1
                                ? props.onCancel
                                : handleNextSlide
                            }
                          >
                            {i === dataSource.length - 1
                              ? 'Get Started'
                              : 'Next'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </OnboardingModalStyled.Carousel>
            </ConfigProvider>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OnboardingModal;
