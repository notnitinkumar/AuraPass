export const isAdmin = (
  req,
  res,
  next
) => {

  if(req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }

  next();
};

export const isOrganizerOrAdmin = (
  req,
  res,
  next
) => {

  if(
      req.user.role === 'ORGANIZER' ||
      req.user.role === 'ADMIN'
  ) {
      return next();
  }

  return res.status(403).json({
      success: false,
      message: 'Organizer access required'
  });
};