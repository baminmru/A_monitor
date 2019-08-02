Imports System
Imports System.Text

Public Class ResponseParser
    Private responseData As Byte()

    Private Sub New()
        Me.DefaultByteOrder = DataByteOrder.LoFirst
    End Sub

    Public Sub New(ByVal bytes As Byte())
        Me.New()
        Me.responseData = bytes
    End Sub

    Public Sub New(ByVal bytes As Byte(), ByVal defaultByteOrder As DataByteOrder)
        Me.New(bytes)
        Me.DefaultByteOrder = defaultByteOrder
    End Sub

    Public Sub New(ByVal bytes As Byte(), ByVal index As Integer, ByVal length As Integer)
        Me.New(bytes)
        Me.responseData = ArrayUtils.SubArray(Of Byte)(bytes, index, length)
    End Sub

    Public Sub New(ByVal bytes As Byte(), ByVal index As Integer, ByVal length As Integer, ByVal defaultByteOrder As DataByteOrder)
        Me.New(bytes, index, length)
        Me.DefaultByteOrder = defaultByteOrder
    End Sub

    Public Shared Function FromResponseBytes(ByVal bytes As Byte()) As ResponseParser
        Return New ResponseParser(bytes)
    End Function

    Public Shared Function FromResponseBytes(ByVal bytes As Byte(), ByVal index As Integer, ByVal length As Integer) As ResponseParser
        Return New ResponseParser(bytes, index, length)
    End Function

    Public Function GetSubPacket(ByVal index As Integer, ByVal length As Integer) As ResponseParser
        Return New ResponseParser(Me.responseData, index, length, Me.DefaultByteOrder)
    End Function

    Public Function ChangeByteOrder(ByVal newByteOrder As DataByteOrder) As ResponseParser
        Return New ResponseParser(Me.Bytes, newByteOrder)
    End Function

    Default Public ReadOnly Property Item(ByVal index As Integer) As Byte
        Get
            Return Me.GetByte(index)
        End Get
    End Property

    Public Function GetByte(ByVal index As Integer) As Byte
        Return Me.responseData(index)
    End Function

    Public Function GetSingle(ByVal index As Integer, ByVal byteOrder As DataByteOrder) As Single
        If byteOrder = DataByteOrder.LoFirst Then Return BitConverter.ToSingle(Me.responseData, index)
        Return BitConverter.ToSingle(BitwiseUtils.Reverse(ArrayUtils.SubArray(Of Byte)(Me.responseData, index, 4)), 0)
    End Function

    Public Function GetSingle(ByVal index As Integer) As Single
        Return Me.GetSingle(index, Me.DefaultByteOrder)
    End Function

    Public Function GetDouble(ByVal index As Integer, ByVal byteOrder As DataByteOrder) As Double
        If byteOrder = DataByteOrder.LoFirst Then Return BitConverter.ToDouble(Me.responseData, index)
        Return BitConverter.ToDouble(BitwiseUtils.Reverse(ArrayUtils.SubArray(Of Byte)(Me.responseData, index, 8)), 0)
    End Function

    Public Function GetDouble(ByVal index As Integer) As Double
        Return Me.GetDouble(index, Me.DefaultByteOrder)
    End Function

    Public Function GetUInt32(ByVal index As Integer, ByVal byteOrder As DataByteOrder) As UInteger
        If byteOrder = DataByteOrder.LoFirst Then Return BitConverter.ToUInt32(Me.responseData, index)
        Return BitConverter.ToUInt32(BitwiseUtils.Reverse(ArrayUtils.SubArray(Of Byte)(Me.responseData, index, 4)), 0)
    End Function

    Public Function GetUInt32(ByVal index As Integer) As UInteger
        Return Me.GetUInt32(index, Me.DefaultByteOrder)
    End Function

    Public Function GetInt32(ByVal index As Integer, ByVal byteOrder As DataByteOrder) As Integer
        If byteOrder = DataByteOrder.LoFirst Then Return BitConverter.ToInt32(Me.responseData, index)
        Return BitConverter.ToInt32(BitwiseUtils.Reverse(ArrayUtils.SubArray(Of Byte)(Me.responseData, index, 4)), 0)
    End Function

    Public Function GetInt32(ByVal index As Integer) As Integer
        Return Me.GetInt32(index, Me.DefaultByteOrder)
    End Function

    Public Function GetInt24(ByVal index As Integer) As Integer
        Return Me.GetInt24(index, Me.DefaultByteOrder)
    End Function

    Public Function GetInt24(ByVal index As Integer, ByVal dbOrder As DataByteOrder) As Integer
        If dbOrder = DataByteOrder.LoFirst Then
            Return CInt(CInt(responseData(index)) Or CInt(responseData(index + 1)) << 8 Or CInt(responseData(index + 2)) << 16)
        Else
            Return CInt(CInt(responseData(index) << 16) Or CInt(responseData(index + 1)) << 8 Or CInt(responseData(index + 2)))
        End If


    End Function

    Public Function GetUInt24(ByVal index As Integer) As UInteger
        Return Me.GetUInt24(index, Me.DefaultByteOrder)
    End Function

    Public Function GetUInt24(ByVal index As Integer, ByVal dbOrder As DataByteOrder) As UInteger
        If dbOrder = DataByteOrder.LoFirst Then
            Return CUInt(CInt(responseData(index)) Or CInt(responseData(index + 1)) << 8 Or CInt(responseData(index + 2)) << 16)
        Else
            Return CUInt(CInt(responseData(index) << 16) Or CInt(responseData(index + 1)) << 8 Or CInt(responseData(index + 2)))
        End If
    End Function

    Public Function GetInt16(ByVal index As Integer, ByVal byteOrder As DataByteOrder) As Short
        If byteOrder = DataByteOrder.LoFirst Then Return BitConverter.ToInt16(Me.responseData, index)
        Return BitConverter.ToInt16(BitwiseUtils.Reverse(ArrayUtils.SubArray(Of Byte)(Me.responseData, index, 2)), 0)
    End Function

    Public Function GetInt16(ByVal index As Integer) As Short
        Return Me.GetInt16(index, Me.DefaultByteOrder)
    End Function

    Public Function GetUInt16(ByVal index As Integer, ByVal byteOrder As DataByteOrder) As UShort
        If byteOrder = DataByteOrder.LoFirst Then Return BitConverter.ToUInt16(Me.responseData, index)
        Return BitConverter.ToUInt16(BitwiseUtils.Reverse(ArrayUtils.SubArray(Of Byte)(Me.responseData, index, 2)), 0)
    End Function

    Public Function GetUInt16(ByVal index As Integer) As UShort
        Return Me.GetUInt16(index, Me.DefaultByteOrder)
    End Function

    Public Function GetUInt64(ByVal index As Integer, ByVal byteOrder As DataByteOrder) As ULong
        If byteOrder = DataByteOrder.LoFirst Then Return BitConverter.ToUInt64(Me.responseData, index)
        Return BitConverter.ToUInt64(BitwiseUtils.Reverse(ArrayUtils.SubArray(Of Byte)(Me.responseData, index, 8)), 0)
    End Function

    Public Function GetUInt64(ByVal index As Integer) As ULong
        Return Me.GetUInt64(index, Me.DefaultByteOrder)
    End Function

    Public Function GetInt64(ByVal index As Integer, ByVal byteOrder As DataByteOrder) As Long
        If byteOrder = DataByteOrder.LoFirst Then Return BitConverter.ToInt64(Me.responseData, index)
        Return BitConverter.ToInt64(BitwiseUtils.Reverse(ArrayUtils.SubArray(Of Byte)(Me.responseData, index, 8)), 0)
    End Function

    Public Function GetInt64(ByVal index As Integer) As Long
        Return Me.GetInt64(index, Me.DefaultByteOrder)
    End Function

    Public Function GetDirectString(ByVal index As Integer, ByVal length As Integer) As String
        Return ArrayUtils.DirectConvert(ArrayUtils.SubArray(Of Byte)(Me.Bytes, index, length))
    End Function

    Public Function GetDirectString() As String
        Return ArrayUtils.DirectConvert(Me.Bytes)
    End Function

    Public Function GetAsciiString(ByVal index As Integer, ByVal length As Integer) As String
        Return Encoding.ASCII.GetString(Me.Bytes, index, length)
    End Function

    Public Function GetAsciiString() As String
        Return Encoding.ASCII.GetString(Me.Bytes)
    End Function

    Public Function GetString(ByVal codepage As Integer, ByVal index As Integer, ByVal count As Integer) As String
        Return Encoding.GetEncoding(codepage).GetString(Me.Bytes, index, count)
    End Function

    Public Function GetString(ByVal codepage As Integer) As String
        Return Encoding.GetEncoding(codepage).GetString(Me.Bytes)
    End Function

    Public ReadOnly Property Length As Integer
        Get
            Return Me.responseData.Length
        End Get
    End Property

    Public ReadOnly Property Bytes As Byte()
        Get
            Return Me.responseData
        End Get
    End Property

    Public Property DefaultByteOrder As DataByteOrder
End Class
