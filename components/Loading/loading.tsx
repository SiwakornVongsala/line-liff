import { JSX } from "react";
import { BouncingElement, Wrapper } from "./loading.style";

export const ColorList = ["#FF5A00", "#FF7A33", "#FF9A66"];

const Loading = (props: any) => {
  const { placeItem } = props;
  return (
    <Wrapper placeItem={placeItem}>
      <div
        className="flex flex-col gap-8 items-center justify-center"
        id="loadingMasCot"
      >
        <div className="flex flex-row gap-2">
          {ColorList.map(
            (color: string, index: number): JSX.Element => (
              <BouncingElement key={index} color={color} index={index + 1} />
            ),
          )}
        </div>

        <p>กรุณารอสักครู่ ระบบกำลังประมวลผล</p>
      </div>
    </Wrapper>
  );
};
export default Loading;
