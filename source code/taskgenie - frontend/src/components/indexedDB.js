const DB_NAME = 'TaskGenieDB';
const DB_VERSION = 7;
const STORE_NAME = 'bookings';
const RECEIPT_STORE_NAME = 'receipts'; // New store for receipts
const USER_STORE_NAME = 'users';
const AD_STORE_NAME = 'ads';
const MESSAGES_STORE_NAME = 'messages'; // New store for chat messages

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      console.log("onupgradeneeded triggered");

      if (!db.objectStoreNames.contains(MESSAGES_STORE_NAME)) {
        console.log("Creating messages store");
        const messageStore = db.createObjectStore(MESSAGES_STORE_NAME, { keyPath: 'id', autoIncrement: true });
        messageStore.createIndex('transactionId', 'transactionId', { unique: false }); // Link to booking
        messageStore.createIndex('timestamp', 'timestamp', { unique: false }); // Index for sorting
      }

      if (!db.objectStoreNames.contains("ratings")) {
        db.createObjectStore("ratings", { keyPath: "id", autoIncrement: true });
      }

      if (!db.objectStoreNames.contains(AD_STORE_NAME)) {
        console.log("Creating ads store");
        db.createObjectStore(AD_STORE_NAME, { keyPath: 'id' });
    } else {
        console.log("Ads store already exists");
    }

      // Ensure stores are created
      if (!db.objectStoreNames.contains(USER_STORE_NAME)) {
        console.log("Creating user store");
        const userStore = db.createObjectStore(USER_STORE_NAME, { keyPath: 'email' });
        userStore.createIndex('profileImage', 'profileImage', { unique: false }); // Add profileImage index
      } else {
        const userStore = request.transaction.objectStore(USER_STORE_NAME);
        if (!userStore.indexNames.contains('profileImage')) {
          console.log("Adding profileImage index to user store");
          userStore.createIndex('profileImage', 'profileImage', { unique: false });
        }
      }

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        console.log("Creating booking store");
        db.createObjectStore(STORE_NAME, { keyPath: 'transactionId' });
      }

      if (!db.objectStoreNames.contains(RECEIPT_STORE_NAME)) {
        console.log("Creating receipt store");
        db.createObjectStore(RECEIPT_STORE_NAME, { keyPath: 'transactionId' });
      }
    };

    request.onsuccess = () => {
      console.log("Database opened successfully");
      resolve(request.result);
    };

    request.onerror = (event) => {
      console.error("Database failed to open:", event.target.errorCode);
      reject("Database failed to open");
    };
  });
};


export const saveMessage = async (message) => {
  const db = await openDB();
  const transaction = db.transaction(MESSAGES_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(MESSAGES_STORE_NAME);
  await store.add(message);
  await transaction.complete;
};



export const getMessages = async (transactionId) => {
  const db = await openDB();
  const transaction = db.transaction(MESSAGES_STORE_NAME, 'readonly');
  const store = transaction.objectStore(MESSAGES_STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      const messages = request.result.filter(
        (message) => message.transactionId === transactionId
      );
      resolve(messages.length > 0 ? messages : []); // Make sure an empty array is returned if no messages
    };
    request.onerror = () => reject("Failed to fetch messages");
  });
};


export const storeAd = async (ad) => {
  console.log("Saving ad:", ad); // Log the ad being saved
  const db = await openDB();
  const transaction = db.transaction(AD_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(AD_STORE_NAME);
  const request = store.put(ad);
  request.onsuccess = () => console.log("Ad saved successfully");
  request.onerror = (e) => console.error("Error saving ad:", e.target.error);
  return transaction.complete;
};


export const getAllAds = async () => {
  const db = await openDB();
  const transaction = db.transaction(AD_STORE_NAME, 'readonly');
  const store = transaction.objectStore(AD_STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
};

export const updateAdInDB = async (ad) => {
  const db = await openDB();
  const transaction = db.transaction(AD_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(AD_STORE_NAME);
  store.put(ad);

  return transaction.complete;
};

export const deleteAdFromDB = async (id) => {
  const db = await openDB();
  const transaction = db.transaction(AD_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(AD_STORE_NAME);
  store.delete(id);

  return transaction.complete;
};

const storeUser = async (userDetails) => {
  try {
      const db = await openDB();

      const transaction = db.transaction(USER_STORE_NAME, 'readwrite');
      const store = transaction.objectStore(USER_STORE_NAME);

      // Check if profileImage is a File object and convert to base64 if so
      if (userDetails.profileImage instanceof File) {
          const base64Image = await fileToBase64(userDetails.profileImage);
          userDetails.profileImage = base64Image;
      }

      // Ensure the password is saved as well
      if (userDetails.password) {
          // Encrypt the password or save it as is (consider encryption for security)
      }

      store.put(userDetails); // Store or update the user details
      console.log("Saving user with profile image and password:", userDetails);
      return new Promise((resolve, reject) => {
          transaction.oncomplete = () => resolve("User updated successfully");
          transaction.onerror = (event) => reject(event.target.error);
      });
  } catch (err) {
      console.error("Failed to store user:", err);
      throw err;
  }
};


// Helper function to convert File to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};



const validateLogin = async (email, password) => {
  const db = await openDB();
  const transaction = db.transaction(USER_STORE_NAME, 'readonly');
  const store = transaction.objectStore(USER_STORE_NAME);

  return new Promise((resolve, reject) => {
      const request = store.get(email);

      request.onsuccess = () => {
          const user = request.result;

          if (user && user.password === password) {
              console.log("Login successful");
              resolve(true);
          } else {
              console.error("Invalid email or password");
              resolve(false);
          }
      };

      request.onerror = (event) => {
          console.error("Error during login validation:", event.target.error);
          reject("Error during login validation");
      };
  });
};

const getUserByEmail = async (email) => {
  const db = await openDB();
  const transaction = db.transaction(USER_STORE_NAME, 'readonly');
  const store = transaction.objectStore(USER_STORE_NAME);

  return new Promise((resolve, reject) => {
      const request = store.get(email);
      request.onsuccess = () => {
          const user = request.result;
          console.log('Fetched user from DB:', user); // Log the fetched user data
          if (user && user.profileImage) {
              // Convert ArrayBuffer to base64 if needed
              if (typeof user.profileImage === 'string') {
                  // Already base64, no action needed
              } else if (user.profileImage instanceof ArrayBuffer) {
                  user.profileImage = arrayBufferToBase64(user.profileImage);
              }
          }
          resolve(user);
      };
      request.onerror = (e) => reject(e);
  });
};



// Helper function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer) => {
  const binary = String.fromCharCode.apply(null, new Uint8Array(buffer));
  return window.btoa(binary);
};


const storeBooking = async (bookingDetails) => {
  console.log("Storing booking:", bookingDetails);

  // Check if status is provided, else set to "Upcoming"
  if (!bookingDetails.status) {
    bookingDetails.status = 'Upcoming'; // Default to "Upcoming"
  }
  if (!bookingDetails.review) {
    bookingDetails.review = { rating: 0, reviewText: "" }; // Default to no review if not provided
  }
  console.log("Storing booking with review:", bookingDetails.review);
  

  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  
  console.log("Booking details before storing:", bookingDetails);
  store.put(bookingDetails);
  

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      console.log("Booking stored successfully with status:", bookingDetails.status);
      console.log("Booking stored successfully with review:", bookingDetails.review);
      resolve("Booking stored successfully");
    };
    transaction.onerror = (event) => {
      console.error("Failed to store booking:", event.target.error);
      reject("Failed to store booking");
    };
  });
};


// Get all bookings from IndexedDB
const getAllBookings = async () => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    console.log('Request to get all bookings:', request);
    request.onsuccess = () => {
      console.log("Retrieved bookings:", request.result);
      resolve(request.result);
    };
    request.onerror = (event) => {
      console.error("Failed to retrieve bookings:", event.target.error);
      reject("Failed to retrieve bookings");
    };
  });
};

// Update an existing booking in IndexedDB
const updateBookingInDB = async (updatedBooking) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  store.put(updatedBooking);  // `put` will update the existing entry if the key exists

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      console.log("Booking updated successfully");
      resolve("Booking updated successfully");
    };
    transaction.onerror = (event) => {
      console.error("Failed to update booking:", event.target.error);
      reject("Failed to update booking");
    };
  });
};

// Update a booking status to "Cancelled" in IndexedDB
const cancelBookingInDB = async (transactionId) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  // Retrieve the booking to update its status
  const booking = await new Promise((resolve, reject) => {
    const request = store.get(transactionId);
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject("Failed to retrieve booking");
  });

  if (booking) {
    booking.status = 'Cancelled'; // Set status to "Cancelled"
    store.put(booking);
  }

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      console.log("Booking status updated to Cancelled");
      resolve("Booking status updated to Cancelled");
    };
    transaction.onerror = (event) => {
      console.error("Failed to update booking status:", event.target.error);
      reject("Failed to update booking status");
    };
  });
};
const storeReceiptInDB = async (receipt) => {
  // Ensure receipt is a Blob
  if (!(receipt instanceof Blob)) {
    console.error('Receipt is not a Blob', receipt);
    return;
  }

  const db = await openDB();
  const transaction = db.transaction(RECEIPT_STORE_NAME, 'readwrite');
  const store = transaction.objectStore(RECEIPT_STORE_NAME);
  store.put(receipt);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      console.log('Receipt stored successfully');
      resolve('Receipt stored successfully');
    };
    transaction.onerror = (event) => {
      console.error('Failed to store receipt:', event.target.error);
      reject('Failed to store receipt');
    };
  });
};


// Get all receipts from IndexedDB
const getAllReceipts = async () => {
  const db = await openDB();
  const transaction = db.transaction(RECEIPT_STORE_NAME, 'readonly');
  const store = transaction.objectStore(RECEIPT_STORE_NAME);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      console.log('Retrieved receipts:', request.result);
      resolve(request.result);
    };
    request.onerror = (event) => {
      console.error('Failed to retrieve receipts:', event.target.error);
      reject('Failed to retrieve receipts');
    };
  });
};


export { storeBooking, getAllBookings,validateLogin,storeUser,getUserByEmail, updateBookingInDB, cancelBookingInDB,storeReceiptInDB, getAllReceipts  };
