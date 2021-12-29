import React from 'react'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
import Title from './Title';

const Services = () => {
    const service = {
      services: [
        {
          icon: <FaCocktail />,
          title: "Free CockTail",
          info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
        },
        {
          icon: <FaHiking />,
          title: "Endless Hiking",
          info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
        },
        {
          icon: <FaShuttleVan />,
          title: "Free Shuttle",
          info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
        },
        {
          icon: <FaBeer />,
          title: "Unlimited Beer",
          info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur",
        },
      ],
    };
    return (
      <div className="container-fluid services">
        <Title title="Services" />
        <div className="row">
          {service.services.map((item, index) => {
            return (
              <div
                className="col-md-4 col-lg-3 col-12 mx-auto my-3"
                key={index}
              >
                <div className="card shadow-lg border-0 p-4">
                  <article className="service">
                    <span>{item.icon}</span>
                    <h6>{item.title}</h6>
                    <p>{item.info}</p>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default Services
