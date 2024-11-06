// Handling uncaught exceptions
const handleUncaughtExceptions = () => {
  process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    console.log("UncaughtExpeption occured shutting down...");

    process.exit(1);
  });
};

export default handleUncaughtExceptions;
