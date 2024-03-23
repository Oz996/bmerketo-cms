import { Product } from "../../../../types/types";
import "./infoTabs.scss";

interface props {
  information: number;
  product: Product;
}
const InfoTabs = ({ information, product }: props) => {
  return (
    <>
      {information === 1 && (
        <>
          <h2>
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
            molestie.
          </h2>
          <div className="details-description">
            <div>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et cusam et justo
                duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata santus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor.
                <br />
                <br />
                accusantium laborum pretium hic excepturi harum repellat
                facilisis convallis potenti, adipiscing lectus aliqua.
                Asperiores repudiandae ipsam error erat, accusamus, cum taciti
                unde?
                <br />
                <br />
                Praesentium, pariatur, tempora consequuntur purus sapiente,
                iaculis vitae consequatur, rhoncus earum eleifend, hendrerit
                ipsum rhoncus ex error, impedit! Alias laboris sequi curae
                aptent? Eu sagittis eu, distinctio tortor? Dapibus delectus!
                Consequuntur luctus.
                <br />
                <br />
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et cusam et justo
                duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata santus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor.
              </p>
            </div>
            <div>
              <img src={product?.images[0]?.image} alt="Image of product" />
            </div>
          </div>
        </>
      )}
      {information === 2 && (
        <div className="details-list">
          <ul>
            <li> Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</li>
            <li>
              Alias laboris sequi curae aptent? Eu sagittis eu, distinctio
              tortor?
            </li>
            <li>At vero eos et cusam et justo duo dolores et ea rebum.</li>
            <li>
              Stet clita kasd gubergren, no sea takimata santus est Lorem ipsum
              dolor sit amet.
            </li>
            <li>
              Asperiores repudiandae ipsam error erat, accusamus, cum taciti
              unde?
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default InfoTabs;
