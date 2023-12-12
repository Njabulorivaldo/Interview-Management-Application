from website import create_app


def run_app():
    app = create_app()
    #app.run(host="0.0.0.0", port=5000)
    app.run( debug="True")

if __name__ == "__main__":
    #app.run(debug=True)
    run_app()