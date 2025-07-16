const ErrorCodes = {
  '23505': 'Row already exists (duplicate key)',             
  '23502': 'Missing required field (null in NOT NULL field)',
  '22001': 'String too long for column',                     
  '22003': 'Numeric value too large',                        
  '22P02': 'Invalid input type',                             
  '23503': 'Invalid foreign key (referenced row not found)', 
  '42804': 'Type mismatch between value and column'          
};


export default ErrorCodes