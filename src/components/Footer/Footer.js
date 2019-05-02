import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

function Footer(props) {
  const sponsors = props.sponsorList.map(sponsor => {
    let sponsorImage = sponsor.imageUrl ? (
      <img className="sponsor" src={sponsor.imageUrl} alt={sponsor.name} />
    ) : (
      <h3>{sponsor.name}</h3>
    );

    return (
      <div className="sponsor my-4 mx-4">
        <a href={sponsor.link || ''}>{sponsorImage}</a>
      </div>
    );
  });

  return (
    <div className="footer">
      <div className="container">
        <h2 className="text-inverse pt-3">Our Sponsors</h2>
        {sponsors}
        <p>
          Open Hearts Open Minds' mission is to nurture inner transformation
          through dialogue, silence, education and the arts, in order to promote
          peace, love and understanding.
        </p>

        <p>
          Open Hearts Open Minds does not discriminate on the basis of sex, age,
          race, economic background, religion or family composition. Our
          organization is secular and non-denominational. OHOM welcomes
          involvement at the board, contractor, volunteer, or participant levels
          from people who identify as members of the LGBTQ, physically or
          mentally challenged, or immigrant and refugee communities.
        </p>
        <p className="mx-5">© 2019 Open Hearts Open Minds | Contact Us</p>
      </div>
    </div>
  );
}

Footer.propTypes = {
  sponsorList: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      link: PropTypes.string
    }).isRequired
  )
};

export default Footer;
