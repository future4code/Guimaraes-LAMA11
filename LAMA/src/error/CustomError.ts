export class CustomError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export class BandIdNotFound extends CustomError {
  constructor() {
    super(404, "Not Found Band, please verify ID Band Sent");
  }
}

export class InvalidEmail extends CustomError {
  constructor() {
    super(405, " Invalid Email, please verify and try again");
  }
}

export class InvalidPassword extends CustomError {
  constructor() {
    super(405, " Invalid Password format, please verify and try again");
  }
}

export class InvalidRole extends CustomError {
  constructor() {
    super(
      401,
      "Invalid Role format, must be 'NORMAL' OR 'ADMIN' verify and try again"
    );
  }
}

export class InvalidRoleBand extends CustomError {
  constructor() {
    super(
      401,
      "Invalid Role format, must be  'ADMIN' verify and try again"
    );
  }
}

export class InvalidToken extends CustomError {
  constructor() {
    super(401, " Invalid Token, please verify and try again");
  }
}




export class MissingParameters extends CustomError {
  constructor() {
    super(
      422,
      "Missing or incorrect information. Consult the documentation and correctly fill the Body of the Request"
    );
  }
}


export class MissingParametersLogin extends CustomError {
  constructor() {
    super(
      422,
      "Missing or incorrect information. Consult the documentation and fill email and password correctly"
    );
  }
}


export class MissingParametersToken extends CustomError {
  constructor() {
    super(
      422,
      "Missing Token. Consult the documentation and fill in headers authorization"
    );
  }
}

export class NodeMailerError extends CustomError {
  constructor() {
    super(400, "Node_Mailer_Error");
  }
}


export class UserNotFoundEmail extends CustomError {
  constructor() {
    super(404, "Not Found, please verify Email User Sent");
  }
}
