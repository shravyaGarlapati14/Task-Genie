import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { storeAd, getAllAds, updateAdInDB, deleteAdFromDB } from './indexedDB';
import '../css/AdsSection.css';

const AdsSection = () => {
  const [ads, setAds] = useState([]);
  const [newAd, setNewAd] = useState({
    id: null,
    title: '',
    description: '',
    serviceType: '',
    image: null,
    expiration: '',
    duration: 0,
    paid: false,
    paymentAmount: 0,
  });
  const [editingAdId, setEditingAdId] = useState(null);

  useEffect(() => {
    // Fetch ads and filter out expired ones on component mount
    getAllAds().then((ads) => {
      const currentDate = new Date();
      const validAds = ads.filter((ad) => new Date(ad.expiration) > currentDate);
      console.log("Valid ads:", validAds); // Log valid ads
      setAds(validAds);
      validAds.forEach((ad) => scheduleAdDeletion(ad));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAd({ ...newAd, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewAd({ ...newAd, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const calculatePayment = (expiration) => {
    const currentDate = new Date();
    const expirationDate = new Date(expiration);
    const durationInHours = Math.ceil((expirationDate - currentDate) / (1000 * 60 * 60)); // Calculate hours
    const ratePerHour = 2; // Example rate
    return durationInHours * ratePerHour;
  };

  const simulatePayment = (paymentAmount) => {
    return Swal.fire({
      title: 'Payment Details',
      html: `
        <p>Total Amount: $${paymentAmount}</p>
        <label for="card-number">Card Number</label>
        <input type="text" id="card-number" class="swal2-input" placeholder="1234 5678 9012 3456" />
        <label for="expiry-date">Expiry Date</label>
        <input type="text" id="expiry-date" class="swal2-input" placeholder="MM/YY" />
        <label for="cvv">CVV</label>
        <input type="password" id="cvv" class="swal2-input" placeholder="123" />
      `,
      confirmButtonText: 'Pay Now',
      focusConfirm: false,
      preConfirm: () => {
        const cardNumber = Swal.getPopup().querySelector('#card-number').value;
        const expiryDate = Swal.getPopup().querySelector('#expiry-date').value;
        const cvv = Swal.getPopup().querySelector('#cvv').value;

        if (!cardNumber || !expiryDate || !cvv) {
          Swal.showValidationMessage('Please fill out all fields');
          return false;
        }

        if (cardNumber.length !== 16 || isNaN(cardNumber)) {
          Swal.showValidationMessage('Enter a valid 16-digit card number');
          return false;
        }

        return { cardNumber, expiryDate, cvv };
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newAd.title && newAd.description && newAd.expiration) {
      const paymentAmount = calculatePayment(newAd.expiration);
      setNewAd({ ...newAd, paymentAmount });

      if (!editingAdId) {
        // Fake payment flow
        simulatePayment(paymentAmount).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Payment Successful',
              text: 'Your ad has been posted!',
              icon: 'success',
            }).then(async () => {
              const adWithId = { ...newAd, id: Date.now(), paid: true };
              await storeAd(adWithId);
              setAds([...ads, adWithId]);
              scheduleAdDeletion(adWithId);
              resetForm();
            });
          }
        });
      } else {
        // Update existing ad
        await updateAdInDB({ ...newAd, id: editingAdId });
        setAds((prev) =>
          prev.map((ad) => (ad.id === editingAdId ? { ...newAd, id: editingAdId } : ad))
        );
        Swal.fire({
          title: 'Ad Updated',
          text: 'Your ad has been successfully updated!',
          icon: 'success',
        });
        scheduleAdDeletion(newAd);
        setEditingAdId(null);
        resetForm();
      }
    }
  };

  const scheduleAdDeletion = (ad) => {
    const timeUntilExpiration = new Date(ad.expiration) - new Date();
    if (timeUntilExpiration > 0) {
      setTimeout(() => {
        deleteAdFromDB(ad.id).then(() => {
          setAds((prev) => prev.filter((item) => item.id !== ad.id));
        });
      }, timeUntilExpiration);
    }
  };

  const resetForm = () => {
    setNewAd({
      id: null,
      title: '',
      description: '',
      serviceType: '',
      image: null,
      expiration: '',
      duration: 0,
      paid: false,
      paymentAmount: 0,
    });
    setEditingAdId(null);
  };

  const handleEdit = (ad) => {
    setEditingAdId(ad.id);
    setNewAd(ad);
  };

  const handleDelete = (adId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This ad will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAdFromDB(adId).then(() => {
          setAds((prev) => prev.filter((item) => item.id !== adId));
          Swal.fire('Deleted!', 'Your ad has been deleted.', 'success');
        });
      }
    });
  };

  return (
    <div className="ads-section">
      <h2>{editingAdId ? 'Edit Ad' : 'Post a New Ad'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Ad Title"
          value={newAd.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Ad Description"
          value={newAd.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="serviceType"
          placeholder="Service Type"
          value={newAd.serviceType}
          onChange={handleChange}
        />
        <input className='datetime' type="datetime-local" name="expiration" value={newAd.expiration} onChange={handleChange} required />
        <input className="choose" type="file" accept="image/*" onChange={handleImageChange} />
        <div className="form-buttons">
          <button type="submit">{editingAdId ? 'Update Ad' : 'Post Ad'}</button>
          {editingAdId && (
            <button type="button" className="cancel-button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2>My Ads</h2>
      {ads.length > 0 ? (
        
        <div className="ads-grid">
            {/* <div>{ads.length} ads loaded</div> */}
          {ads.map((ad) => (
            
            <div key={ad.id} className="ad-card">
              {ad.image && <img className="adimg" src={ad.image} alt={ad.title} />}
              <h3 className="adtitle">{ad.title}</h3>
              <p className="addesc">{ad.description}</p>
              <p>
                <strong>Service Type:</strong> {ad.serviceType}
              </p>
              <p>
                <strong>Expires:</strong> {new Date(ad.expiration).toLocaleString()}
              </p>
              <p>
                {/* <strong>Payment:</strong> ${ad.paymentAmount} */}
              </p>
              {ad.paid && <p className="adpaid">💰 Paid Ad</p>}
              <div className="ad-actions">
                <button className='adedit' onClick={() => handleEdit(ad)}>Edit</button>
                <button className='addelete' onClick={() => handleDelete(ad.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No ads posted yet.</p>
      )}
    </div>
  );
};

export default AdsSection;
